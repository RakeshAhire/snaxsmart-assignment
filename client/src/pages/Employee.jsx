
import { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import {
    Box, Button, Heading, VStack,
    Table, Thead, Tbody, Tr, Th, Td, IconButton,

    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [department, setDepartment] = useState("");
    const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("https://odd-red-gopher-cap.cyclic.app/employee");
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post(
                "https://odd-red-gopher-cap.cyclic.app/employee/create",
                {
                    companyName,
                    employeeName,
                    cardNo,
                    email,
                    contactNo,
                    department,
                }
            );
            setEmployees([...employees, response.data]);
            onCloseCreateModal()
            fetchEmployees()
            setCompanyName("")
            setEmployeeName("")
            setCardNo("")
            setEmail("")
            setContactNo("")
            setDepartment("")
            
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://odd-red-gopher-cap.cyclic.app/employee/delete/${id}`);
            // Set isDeleted flag to true to hide the employee data
            fetchEmployees()
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async (id) => {
        try {
            const response = await axios.put(
                `https://odd-red-gopher-cap.cyclic.app/employee/edit/${id}`,
                {
                    companyName,
                    employeeName,
                    cardNo,
                    email,
                    contactNo,
                    department,
                }
            );
            onCloseEditModal()
            fetchEmployees()
            setCompanyName("")
            setEmployeeName("")
            setCardNo("")
            setEmail("")
            setContactNo("")
            setDepartment("")
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(employees)
    return (
        <Box p={4}>
            <Navbar />
            <VStack spacing={4} align="stretch">
                <Box textAlign="right" mt={10}>
                    <Button onClick={onOpenCreateModal} colorScheme="teal" >
                        Add Employee
                    </Button>
                    {isCreateModalOpen && (
                        <Modal isOpen={isCreateModalOpen} onClose={onCloseCreateModal}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>"Create Employee"</ModalHeader>
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Company Name</FormLabel>
                                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Employee Name</FormLabel>
                                        <Input value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Card No</FormLabel>
                                        <Input value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Email</FormLabel>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Contact No</FormLabel>
                                        <Input value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Department</FormLabel>
                                        <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleAddEmployee}>
                                        Save
                                    </Button>
                                    <Button onClick={onCloseCreateModal}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                </Box>
                <Heading size="md">Employee List</Heading>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Company Name</Th>
                            <Th>Employee Name</Th>
                            <Th>Card No.</Th>
                            <Th>Email</Th>
                            <Th>Contact No.</Th>
                            <Th>Department</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employees.filter((employee) => !employee.isDeleted ? employee : "").map((employee) => (

                            <Tr key={employee._id}>
                                <Td>{employee.companyName}</Td>
                                <Td>{employee.employeeName}</Td>
                                <Td>{employee.cardNo}</Td>
                                <Td>{employee.email}</Td>
                                <Td>{employee.contactNo}</Td>
                                <Td>{employee.department}</Td>
                                <Td>
                                    <IconButton
                                        icon={<FaEdit />}
                                        aria-label="Edit"
                                        onClick={onOpenEditModal}
                                        mr={2}
                                    />
                                    {isEditModalOpen && (
                                        <Modal isOpen={isEditModalOpen} onClose={onCloseEditModal}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>"Edit Employee"</ModalHeader>
                                                <ModalBody>
                                                    <FormControl>
                                                        <FormLabel>Company Name</FormLabel>
                                                        <Input value={employee.companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Employee Name</FormLabel>
                                                        <Input value={employee.employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Card No</FormLabel>
                                                        <Input value={employee.cardNo} onChange={(e) => setCardNo(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Email</FormLabel>
                                                        <Input value={employee.email} onChange={(e) => setEmail(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Contact No</FormLabel>
                                                        <Input value={employee.contactNo} onChange={(e) => setContactNo(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Department</FormLabel>
                                                        <Input value={employee.department} onChange={(e) => setDepartment(e.target.value)} />
                                                    </FormControl>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={() => handleEdit(employee._id)}>
                                                        Save
                                                    </Button>
                                                    <Button onClick={onCloseEditModal}>Cancel</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    )}

                                    <IconButton
                                        icon={<FaTrash />}
                                        aria-label="Delete"
                                        onClick={() => handleDelete(employee._id)}
                                    />
                                </Td>
                            </Tr>

                        ))}
                    </Tbody>
                </Table>

            </VStack>
        </Box>
    );
};

export default Employee;



