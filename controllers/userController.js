const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
	const { name, email, password, phoneNumber } = req.body;
	const userByEmail = await User.findOne({email});
	if(userByEmail) {
		res.status(403).json({error: {email: "Sorry! This email is already registered."}});
		return;
	}
	const userByPhone = await User.findOne({phoneNumber});
	if(userByPhone) {
		res.status(403).json({error: {phoneNumber: "Sorry! This mobile number is already registered"}});
		return;
	}
	const user = await User.create({ name, email, password, phoneNumber });
	res.status(201).json({
		name: user.name,
		email: user.email,
		phoneNumber: user.phoneNumber,
	});
};

module.exports.login = async (req, res) => {
	const { password } = req.body;
	let user, responseString;

	if (req.body?.email) {
		user = await User.findOne({ email: req.body.email });
		responseString = "email";
	} else {
		user = await User.findOne({ phoneNumber: req.body.phoneNumber });
		responseString = "mobile number";
	}

	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			res.status(200).json(req.body);
		} else {
			res.status(403).json({ error: {password:"Sorry! Password entered is incorrect."} });
		}
	} else {
		res
			.status(404)
			.json({ error: {email:`Sorry! This ${responseString} is not registered.`} });
	}
};

module.exports.recoverPassword = async (req, res) => {
	let user, responseString;

	if (req.body?.email) {
		user = await User.findOne({ email: req.body.email });
		responseString = "email";
	} else {
		user = await User.findOne({ phoneNumber: req.body.phoneNumber });
		responseString = "mobile number";
	}

	if (user) {
		res.status(200).json({ message: "Recovery link send" });
	} else {
		res
			.status(404)
			.json({ error: `Sorry! This ${responseString} is not registered` });
	}
};
