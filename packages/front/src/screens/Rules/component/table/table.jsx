import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const RuleTable = ({ header, rows }) => (
  <Table>
    <TableHead>
      <TableRow>
        {map(header, (headerCol, index) => (
          <TableCell key={index}>{headerCol}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {map(rows, (row, index) => (
        <TableRow key={index}>
          {map(row, (col, id) => (
            <TableCell key={id}>{col}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

RuleTable.defaultProps = {
  header: [],
  rows: [[]],
}

RuleTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.node),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
}

export default RuleTable
