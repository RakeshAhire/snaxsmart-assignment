
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

const Machine = () => {
    const [machines, setMachines] = useState([]);
    const [newid, setNewid] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [installLocation, setInstallLocation] = useState("");
    const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
    const fetchMachines = async () => {
        try {
            const response = await axios.get("https://odd-red-gopher-cap.cyclic.app/machine");
            setMachines(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchMachines();
    }, []);

    const handleAddMachine = async () => {
        // console.log("ok")
        try {
            const response = await axios.post(
                "https://odd-red-gopher-cap.cyclic.app/machine/create",
                {
                    id:newid,
                    companyName,
                    description,
                    installLocation

                }
            );
            setMachines([...machines, response.data]);
            onCloseCreateModal()
            fetchMachines();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://odd-red-gopher-cap.cyclic.app/machine/delete/${id}`);
            // Set isDeleted flag to true to hide the employee data
            fetchMachines();
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = async (id) => {
        try {
            const response = await axios.post(
                `https://odd-red-gopher-cap.cyclic.app/machine/edit/${id}`,
                {

                    companyName,
                    description,
                    installLocation

                }
            );
            setMachines([...machines, response.data]);
            onCloseEditModal()
            fetchMachines();
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
                        Add Machine
                    </Button>
                    {isCreateModalOpen && (
                        <Modal isOpen={isCreateModalOpen} onClose={onCloseCreateModal}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>"Create Machine"</ModalHeader>
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Company Name</FormLabel>
                                        <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Cutom Id</FormLabel>
                                        <Input value={newid} onChange={(e) => setNewid(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Description</FormLabel>
                                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Install Location</FormLabel>
                                        <Input value={installLocation} onChange={(e) => setInstallLocation(e.target.value)} />
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleAddMachine}>
                                        Save
                                    </Button>
                                    <Button onClick={onCloseCreateModal}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                </Box>
                <Heading size="md">Machine List</Heading>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Machine ID</Th>
                            <Th>Company Name</Th>
                            <Th>Description</Th>
                            <Th>Install Location</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {machines.filter((machine) => !machine.isDeleted ? machine : "").map((machine) => (
                            <Tr key={machine._id}>
                                <Td>{machine.id}</Td>
                                <Td>{machine.companyName}</Td>
                                <Td>{machine.description}</Td>
                                <Td>{machine.installLocation}</Td>
                                <Td>
                                    <IconButton
                                        icon={<FaEdit />}
                                        aria-label="Edit"
                                        onClick={() => onOpenEditModal}
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
                                                        <Input value={machine.companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Description</FormLabel>
                                                        <Input value={machine.description} onChange={(e) => setDescription(e.target.value)} />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Install Location</FormLabel>
                                                        <Input value={machine.installLocation} onChange={(e) => setInstallLocation(e.target.value)} />
                                                    </FormControl>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={() => handleEdit(machine._id)}>
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
                                        onClick={() => handleDelete(machine._id)}
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

export default Machine;




