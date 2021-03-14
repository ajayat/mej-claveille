


exports.addArticle = (req, res) => {
    Article.create({ ...req.body, userId: req.user.id })
        .then(article => {
            res.status(201).json({ article: {
                    id: article.id,
                    title: article.title,
                    content: article.content,
                    createdAt: article.createdAt
                }
            })
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot add the article !' })
            console.log(error)
        })
}


exports.getRandomArticle = (req, res) => {
    Article.findAll()
        .then(articles => {
            if(articles.length > 0) {
                const date = new Date()
                const somme = date.getFullYear() + date.getMonth() + date.getDate()
                const article = articles[somme % articles.length]
                res.status(200).json({ article : {
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        createdAt: article.createdAt
                    } })
            }
            else {
                res.status(404).json({ error: 'Article not found !'})
            }

        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !' }))

}


exports.getAllArticle = (req, res) => {
    Article.findAll()
        .then(articles => res.status(200).json({ articles }))
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !' }))
}

exports.getOneArticle = (req, res) => {
    Article.findOne({ where: { id: req.params.id } })
        .then(article => {
            if(article) {
                res.status(200).json({ article })
            }
            else {
                res.status(404).json({ error: 'Article not found !'})
            }
        })
        .catch(() => res.status(500).json({ error: 'An error has occurred on the server !' }))
}

exports.deleteArticle = (req, res) => {
    const id = req.params.id
    Article.destroy({ where: { id }})
        .then(result => {
            if (result) {
                res.status(204).json({ message: `Article ${id} deleted successfully !`})
            }
            else {
                res.status(404).json({ message: `Article ${id} does not exist !`})
            }

        })
        .catch(() => res.status(500).json({ error: `An error has occurred on the server !`}))
}

exports.updateArticle = (req, res) => {
    const id = req.params.id
    Article.update({ ...req.body }, { where: { id }})
        .then(article => {
            console.log(article[0])
            if (article[0]) {
                res.status(200).json({ message: `Article ${id} update successfully !`})
            }
            else {
                res.status(404).json({ message: `Article ${id} does not exist !`})
            }
        })
        .catch(() => res.status(500).json({ error: `An error has occurred on the server !`}))
}