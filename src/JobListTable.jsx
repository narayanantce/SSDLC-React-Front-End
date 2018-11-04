import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

class SimpleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "test",
      data: []
    };
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(row => {
              return (
                <TableRow key={row.ID}>
                  <TableCell component="th" scope="row">
                    {row.TITLE}
                  </TableCell>
                  <TableCell>{row.LOCATION}</TableCell>
                  <TableCell>
                    <IconButton onClick={this.props.onEditClick(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={this.props.onDeleteClick(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default SimpleTable;
