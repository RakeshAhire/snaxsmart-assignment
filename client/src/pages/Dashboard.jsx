import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TransactionFilter from "../components/TransactionFilter";

const fields = ["E-Name", "E-Card No", "M-Company", "M-ID", "Slot", "Status"];

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchData = async () => {
        const url = `https://odd-red-gopher-cap.cyclic.app/vendreq`;
        const response = await axios.get(url);
        setTransactions(response.data);
    }
    const fetchTransactions = async (filterData) => {
        const { machineId, cardNo, date, transaction } = filterData;

        const url = machineId ? `https://odd-red-gopher-cap.cyclic.app/vendreq?machineid=${machineId}`
            :
            cardNo ? `https://odd-red-gopher-cap.cyclic.app/vendreq?cardNo=${cardNo}`
                :
                date ? `https://odd-red-gopher-cap.cyclic.app/vendreq?date=${date}`
                    :
                    transaction ? `https://odd-red-gopher-cap.cyclic.app/vendreq?transactionStatus=${transaction}`
                        : `https://odd-red-gopher-cap.cyclic.app/vendreq`;

        const response = await axios.get(url);
        // console.log('response: ', response);
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchData()
    }, [])
    // console.log(transactions)

    return (
        <>
            <Navbar />
            <TransactionFilter onFilter={fetchTransactions} />
            <Box mt={10}>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            {fields.map((field) => (
                                <Th key={field}>{field}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactions?.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.employeeid?.employeeName}</Td>
                                <Td>{item.employeeid?.cardNo}</Td>
                                <Td>{item.machineid?.companyName}</Td>
                                <Td>{item.machineid?.id}</Td>
                                <Td>{item.slotName}</Td>
                                <Td>{item.transactionStatus ? "Sucess" : "Failed"}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};

export default Dashboard;