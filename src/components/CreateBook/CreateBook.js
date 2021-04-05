import { Button, Input, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { store } from '../../store/store'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      width: '600px',
      marginBottom: '2rem',
    },
  },
}))
const CreateBook = () => {
  const {
    state: { user },
  } = useContext(store)

  const classes = useStyles()
  const history = useHistory()
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const createBookApi = async (authToken, book) => {
    return axios.post(
      'https://book-bazar1.herokuapp.com/books',
      { book },
      {
        headers: {
          authToken,
        },
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('hi')
    const book = {
      name,
      author,
      price,
      image: imageUrl,
    }
    const res = await createBookApi(user.token, book)
    console.log(res)

    history.push('/')
  }

  const uploadImage = async (imageData) => {
    try {
      const {
        data: { data },
      } = await axios.post('https://api.imgbb.com/1/upload', imageData)

      return data.display_url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <Typography variant='h3' color='primary'>
            Create Book
          </Typography>
          <Input
            placeholder='Book Name'
            inputProps={{ 'aria-label': 'bookName' }}
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='author Name'
            inputProps={{ 'aria-label': 'authorName' }}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            placeholder='Price'
            inputProps={{ 'aria-label': 'price' }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type='file'
            onChange={async (e) => {
              const imageData = new FormData()
              imageData.set('key', '5707f0eaff5559256ce74fac9612401e')
              imageData.append('image', e.target.files[0])
              const url = await uploadImage(imageData)
              setImageUrl(url)
            }}
          />

          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default CreateBook
