import { CircularProgress, Container, Grid } from '@material-ui/core'
import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getBooksAction } from '../../store/action/actions'
import { store } from '../../store/store'
import Book from '../Book/Book'

const Home = () => {
  const [loading, setLoading] = useState(true)

  const fetchBooksFromServer = async () => {
    return axios.get('https://book-bazar1.herokuapp.com/books')
  }

  const {
    dispatch,
    state: { books },
  } = useContext(store)

  useEffect(() => {
    const getBooks = async () => {
      const books = await fetchBooksFromServer()
      dispatch(getBooksAction(books.data))
      console.log(books)
      setLoading(false)
    }

    getBooks()
  }, [])
  return (
    <div>
      {loading ? (
        <>
          <CircularProgress
            style={{
              display: 'block',
              position: 'absolute',
              top: '65%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '5000',
            }}
            color='primary'
          />
        </>
      ) : (
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid xs={12} sm={6} lg={4} xl={3} key={book._id} item>
                <Book {...book} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  )
}

export default Home
