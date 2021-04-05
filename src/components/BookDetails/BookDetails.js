import React, { useContext, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { store } from '../../store/store'
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { Button, Container } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '100%',
  },
  body: {
    fontSize: 14,
    width: '100%',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    width: '100%',

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

export default function BookDetails() {
  const history = useHistory()
  const [rows, setRows] = useState([])
  const classes = useStyles()

  const {
    state: { user },
  } = useContext(store)

  const { id } = useParams()

  const getProduct = async (authToken, id) => {
    console.log({ ashik: authToken })
    return axios.get(`https://book-bazar1.herokuapp.com/book/${id}`, {
      headers: {
        authToken,
      },
    })
  }

  const createOrder = async (authToken, bookId) => {
    return axios.post(
      'https://book-bazar1.herokuapp.com/orders',
      { bookId },
      {
        headers: {
          authToken,
        },
      }
    )
  }

  useEffect(() => {
    const loadBook = async () => {
      const book = await getProduct(user.token, id)
      const { name, quantity, price, _id: bookId } = book.data
      setRows([
        {
          name,
          quantity,
          price,
          id: bookId,
        },
      ])
    }

    loadBook()
  }, [])

  return (
    <div style={{ marginTop: '5rem' }}>
      <Container maxWidth='md'>
        <TableContainer component={Paper}>
          <TableContainer
            className={classes.table}
            aria-label='customized table'
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell>{row.price}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </TableContainer>
        </TableContainer>

        <Button
          onClick={async () => {
            await createOrder(user.token, rows[0].id)
            history.push('/orders')
          }}
          style={{ marginTop: '1rem' }}
          variant='contained'
          color='primary'
        >
          Checkout
        </Button>
      </Container>
    </div>
  )
}
