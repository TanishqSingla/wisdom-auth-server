const User = require("../models/User");

module.exports.signup = async (req, res) => {
	const { name, email, password, phoneNumber } = req.body;
	const user = await User.create({ name, email, password, phoneNumber });
	res.status(201).json({
		name: user.name,
		email: user.email,
		phoneNumber: user.phoneNumber,
	});
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			res.status(200).json(req.body);
		} else {
			res.status(403).json({ error: "Password doesn't match" });
		}
	} else {
		res.status(404).json({ error: "Email doesn't exist" });
	}
};
