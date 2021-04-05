import React, { useContext, useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Moment from 'react-moment'
import 'moment-timezone'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Container } from '@material-ui/core'
import { store } from '../../store/store'

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function Orders() {
  const classes = useStyles()
  const [orders, setOrders] = useState([])

  const {
    dispatch,
    state: { user },
  } = useContext(store)

  const getOrders = async (authToken) => {
    return axios.get('https://book-bazar1.herokuapp.com/orders', {
      headers: {
        authToken,
      },
    })
  }

  useEffect(() => {
    const loadOrders = async () => {
      const orders = await getOrders(user.token)
      setOrders(orders.data)
    }

    loadOrders()
  }, [])

  return (
    <Container maxWidth='md'>
      <TableContainer style={{ marginTop: '5rem' }} component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align='right'>Book Name</StyledTableCell>
              <StyledTableCell align='right'>Author</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell align='right'>Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 &&
              orders.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.book.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.book.author}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.book.price}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Moment>{row.createdAt}</Moment>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
