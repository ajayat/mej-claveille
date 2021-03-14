


module.exports = validUser = async (req, res) => {
    res.status(200).json({ user: { id: req.user.id, role: req.user.role } })
}