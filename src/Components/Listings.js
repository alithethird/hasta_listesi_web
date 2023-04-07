import { db } from "../utils/firebase";
import { onValue, ref, push, set, update, remove } from "firebase/database";
import { Link } from 'react-router-dom';
import "../styling/Listings.css";
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Update } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import SearchBar from '@mkyy/mui-search-bar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";


export default function Listings() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [checkBox, setCheckBox] = React.useState(0);
    const deleteList = [];
    let falseItems = [];
    let trueItems = [];
    const [trueRows, setTrueRows] = React.useState([]);
    const [falseRows, setFalseRows] = React.useState([]);
    const [originalTrueRows, setOriginalTrueRows] = React.useState([]);
    const [originalFalseRows, setOriginalFalseRows] = React.useState([]);
    const { userKey, setUserKey } = React.useContext(UserContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        // Get a reference to the database
        const query = ref(db, "hastalar");
        const dataq = onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                falseItems = [];
                trueItems = [];
                Object.keys(data).map((key) => {
                    let project = data[key];
                    project["key"] = key;
                    if (project.bittiMi == false) {
                        falseItems.push(project);
                    } else {
                        trueItems.push(project);
                    }
                });
                // setTrueRows(trueItems);
                // setFalseRows(falseItems);
                setOriginalTrueRows(trueItems);
                setOriginalFalseRows(falseItems);
            }
        });
    }, []);
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const headCells = [
        {
            id: 'isim',
            numeric: false,
            disablePadding: true,
            label: 'Hasta adi',
        },
        {
            id: 'phone',
            numeric: true,
            disablePadding: false,
            label: 'Telefon',
        },
        {
            id: 'not',
            numeric: false,
            disablePadding: false,
            label: 'Notlar',
        },
        {
            id: 'bittiMi',
            numeric: true,
            disablePadding: false,
            label: 'Bitti',
        },
    ];
    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }



    function EnhancedTableToolbar(props) {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {props.tableName}
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => { deleteElement() }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }


    const handleRequestSort = (event, property) => {
        console.log("property: ", property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = falseRows.map((n) => n.key);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    function handleCheckbox2Change(value, event) {
        event.stopPropagation();
        console.log("value.key: ", value.key);
        value.bittiMi = event.target.checked;
        console.log("bittiMi is now " + event.target.checked);
        const queryu = ref(db, "hastalar");
        const updates = {};
        updates[String(value.key) + "/bittiMi"] = event.target.checked;
        console.log("updates: ", updates);
        update(queryu, updates);
        const query = ref(db, "hastalar");
        const dataq = onValue(query, (snapshot) => {
            const data = snapshot.val();
            // console.log("data: ", data);
            if (snapshot.exists()) {
                falseItems = [];
                trueItems = [];
                Object.keys(data).map((key) => {
                    let project = data[key];
                    project["key"] = key;
                    if (project.bittiMi == false) {
                        falseItems.push(project);
                    } else {
                        trueItems.push(project);
                    }
                    // console.log("project: ", project);
                    // console.log("key: ", key);
                });
                // setTrueRows(trueItems);
                // setFalseRows(falseItems);
                setOriginalTrueRows(trueItems);
                setOriginalFalseRows(falseItems);
            }
        });
        setCheckBox((prev) => {
            return prev + 1;
        });
    }
    function deleteElement() {
        console.log("deleteeee: ", selected);
        console.log("deleteeee len: ", selected.length);
        for (let i = 0; i < selected.length; i++) {
            console.log("delete select", selected[i]);
            const deleteQuery = ref(db, "hastalar/" + selected[i]);
            // deleteQuery.remove();
            remove(deleteQuery);
        }
        setCheckBox((prev) => {
            return prev + 1;
        });
        console.log("trueRows: ", trueRows);

    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    React.useEffect(() => {
        setTrueRows(() => originalTrueRows);
        setFalseRows(() => originalFalseRows);
        console.log("originalTrueRows:::", originalTrueRows);
        console.log("originalFalseRows:::", originalFalseRows);

    }, [originalTrueRows])
    // Avoid a layout jump when reaching the last page with empty falseRows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - falseRows.length) : 0;
    // const [textFieldValue, setTextFieldValue] = React.useState("");
    const handleSearch = textFieldValue => {
        setTrueRows(() => [...originalTrueRows]);
        setFalseRows(() => [...originalFalseRows]);
        console.log("originalFalseRows: ", originalFalseRows);
        let dummyTrueRow = [];
        let dummyFalseRow = [];
        console.log(textFieldValue);
        Object.values(originalTrueRows).map((value) => {
            if (value.isim.toLowerCase().includes(textFieldValue)) {
                console.log("value: ", value.isim);
                // console.log("value.isim.indexOf(textFieldValue): ", value.isim.indexOf(textFieldValue));
                dummyTrueRow.push(value);
            }
        });
        Object.values(originalFalseRows).map((value) => {
            if (value.isim.toLowerCase().includes(textFieldValue)) {
                console.log("value: ", value.isim);
                // console.log("value.isim.indexOf(textFieldValue): ", value.isim.indexOf(textFieldValue));
                dummyFalseRow.push(value);
            }
        });
        setTrueRows(dummyTrueRow);
        setFalseRows(dummyFalseRow);
    };

    const goToModify = (event, key) => {
        console.log(key);
        setUserKey(key);
        navigate('/ModifyForm', { replace: false });
    }
    return (

        <Box sx={{ width: '100%' }}>
            <Stack spacing={2} direction="row">
                <Link to="/hasta_listesi_web" style={{ paddingLeft: 13, textDecoration: 'none' }}><Button variant="contained">Ana Ekran</Button></Link>
                <Link to="/Form" style={{ paddingLeft: 13, textDecoration: 'none' }}><Button variant="contained">Yeni Hasta Ekle</Button></Link>
            </Stack>
            <SearchBar
                onChange={newValue => handleSearch(newValue)}
                onSearch={handleSearch}
            />
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} tableName="Devam Eden Hasta Listesi" />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={falseRows.length}
                        />
                        <TableBody>
                            {stableSort(falseRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.key);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => { goToModify(event, row.key) }}
                                            onChange={(event) => handleClick(event, row.key)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.key}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.isim}
                                            </TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.not}</TableCell>
                                            <TableCell align="right"><input
                                                type="checkbox"
                                                name="checkbox2"
                                                value={row.bittiMi}
                                                checked={row.bittiMi}
                                                onChange={handleCheckbox2Change.bind(null, row)}
                                                style={{
                                                    color: "primary",
                                                    marginLeft: '10px',
                                                    verticalAlign: 'middle',
                                                    appearance: 'checkbox',
                                                    WebkitAppearance: 'checkbox',
                                                    MozAppearance: 'checkbox',
                                                    msAppearance: 'checkbox',
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '3px',
                                                    outline: 'none',
                                                    border: '1px solid rgba(0,0,0,0.2)',
                                                    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                                                    background: row.bittiMi ? 'blue' : 'pink'
                                                }}
                                            /></TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={falseRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <EnhancedTableToolbar numSelected={selected.length} tableName="Bitmis Hasta Listesi" />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={trueRows.length}
                        />
                        <TableBody>
                            {stableSort(trueRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.key);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onChange={(event) => handleClick(event, row.key)}
                                            onClick={(event) => { goToModify(event, row.key) }}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.key}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.isim}
                                            </TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.not}</TableCell>
                                            <TableCell align="right"><input
                                                type="checkbox"
                                                name="checkbox2"
                                                value={row.bittiMi}
                                                checked={row.bittiMi}
                                                onChange={handleCheckbox2Change.bind(null, row)}
                                                style={{
                                                    color: "primary",
                                                    marginLeft: '10px',
                                                    verticalAlign: 'middle',
                                                    appearance: 'checkbox',
                                                    WebkitAppearance: 'checkbox',
                                                    MozAppearance: 'checkbox',
                                                    msAppearance: 'checkbox',
                                                    width: '16px',
                                                    height: '16px',
                                                    borderRadius: '3px',
                                                    outline: 'none',
                                                    border: '1px solid rgba(0,0,0,0.2)',
                                                    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                                                    background: row.bittiMi ? 'blue' : 'pink'
                                                }}
                                            /></TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={trueRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Sıkı Görünüm"
            />
        </Box>
    );



}