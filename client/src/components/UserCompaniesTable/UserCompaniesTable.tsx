import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Table,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { companyService } from '../../services/company.service';
import styles from './UserCompaniesTable.module.scss';

export const UserCompaniesTable = () => {
    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['companies'],
        queryFn: () => companyService.getCompanies(),
    });

    if (isFetching) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        Notify.failure(error.message);
        return <h2>Something went wrong</h2>;
    }

    console.log(data);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className={styles.header_row}>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">
                            Service Of Activity
                        </TableCell>
                        <TableCell align="center">
                            Number Of Employees
                        </TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((company) => (
                        <TableRow key={company.name}>
                            <TableCell align="center">{company.name}</TableCell>
                            <TableCell align="center">
                                {company.serviceOfActivity}
                            </TableCell>
                            <TableCell align="center">{company.type}</TableCell>
                            <TableCell align="center">
                                {company.numberOfEmployees}
                            </TableCell>
                            <TableCell align="center">
                                {company.description}
                            </TableCell>
                            <TableCell align="center">
                                {company.address}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
