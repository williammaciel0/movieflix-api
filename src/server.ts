import express from 'express'
import { PrismaClient } from '@prisma/client'

const port = 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/movies', async (_, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: 'desc',
        },
        include: {
            genres: true,
            languages: true,
        },
    })
    res.json(movies)
})

app.post('/movies', async (req, res) => {
    // console.log(` Corpo da requisição: ${req.body.title} `)

    const { title, genre_id, language_id, oscar_count, release_date } = req.body

    try {
        // case insensitive - se a busca for feita por liga da justiça ou LIGA DE JUSTIÇA, o registro vai ser retornado na consulta

        // case sensitive - se buscar Liga da Justiça e no banco tiver LIGA DA JUSTIÇA, não vai ser retornado na comsulta

        const movieWithSameTitle = await prisma.movie.findFirst({
            where: { title: { equals: title, mode: 'insensitive' } },
        })

        if (movieWithSameTitle) {
            return res.status(409).send({
                message: 'Já existe um filme cadastrado com esse título',
            })
        }

        await prisma.movie.create({
            data: {
                title: title,
                genre_id: genre_id,
                language_id: language_id,
                oscar_count: oscar_count,
                release_date: new Date(release_date),
            },
        })
    } catch (error) {
        return res.status(500).send({ message: 'Falha ao cadastrar um filme' })
    }

    res.status(201).send()
})

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`)
})
