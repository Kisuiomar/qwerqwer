import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts
            .map(obj => obj.tags)
            .flat()
            .slice(0, 5)
            
        console.log(tags)
        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Cannot get tags"
        })
    } 
}

export const getAll = async(req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Cannot get posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            { 
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: "After" 
            }  
        )
        .populate('user')
        .then(doc => {
            if (!doc) {
                throw Error;
            }
            res.json(doc);
        })
        .catch(err => res.status(404).json({ message: 'Article not found'}));

    } catch (err) {
        
    }
}

export const create = async (req, res) => {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      });
  
      const post = await doc.save();
  
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Cannot create a post',
      });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id

    await PostModel.updateOne(
        {
            _id: postId
        },
        {
            title: req.body.title,
            text:req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.body.user,
        }
    )

    res.json({
        success:true
    })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Npt found"
        })
    }
}

export const remove = async(req, res) => {
    try {
        const postId = req.params.id

        const doc = await PostModel.findOneAndDelete({ _id: postId });
    
        if (!doc) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }
    
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot remove post',
        });
    }
    
}