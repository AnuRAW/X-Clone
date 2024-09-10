import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log("Error in getUserProfile controller", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id) {
            return res.status(400).json({ error: "You can't follow/unfollow yourself" });
        }
        if(!userToModify || !currentUser) return res.status(400).json({
            error: "User not found"
        });
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing) {
         //unfollow the user
            await User.findByIdAndUpdate(id, {
                $pull: {
                    followers: req.user._id
                }
            });
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {
                    following: id
                }
            }); 
            res.status(200).json({ message: "Unfollowed successfully" });
        } else{
            //follow the user
              await User.findByIdAndUpdate(id, {
                $push: {
                  followers: req.user._id
                }
              });
              await User.findByIdAndUpdate(req.user._id, {
                $push: {
                  following: id
                }
              });
              //send notification to the user
              res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        console.log("Error in followUnfollowUser controller", error.message);
         res.status(500).json({ error: "Internal Server Error" });
    }

}