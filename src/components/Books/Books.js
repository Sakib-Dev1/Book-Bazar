import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { store } from '../../store/store'
import { DeleteOutlined } from '@material-ui/icons'
import { Button, Container } from '@material-ui/core'
import { getBooksAction } from '../../store/action/actions'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function Books() {
  const classes = useStyles()

  const deleteBook = async (authToken, id) => {
    return axios.delete(
      `https://book-bazar1.herokuapp.com/book/${id}`,

      {
        headers: {
          authToken,
        },
      }
    )
  }

  const {
    dispatch,
    state: { books, user },
  } = useContext(store)

  const getBooks = async () => {
    return axios.get('https://book-bazar1.herokuapp.com/books')
  }

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await getBooks()
      dispatch(getBooksAction(allBooks.data))
    }

    loadBooks()
  }, [])

  return (
    <Container maxWidth='md'>
      <TableContainer component={Paper} style={{ marginTop: '5rem' }}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Name</StyledTableCell>
              <StyledTableCell>Author Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 &&
              books.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.author}</StyledTableCell>
                  <StyledTableCell>{row.price}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={async () => {
                        await deleteBook(user.token, row._id)
                        const books = await getBooks()
                        console.log({ books })
                        dispatch(getBooksAction(books.data))
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
