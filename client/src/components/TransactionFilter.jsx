import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";

const TransactionFilter = ({ onFilter }) => {
  const [filterData, setFilterData] = useState({
    machineId: "",
    cardNo: "",
    date: "",
    transaction: "",
  });

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filterData);
  };

  const handleChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleFilter}>
      <HStack m="auto" w="99%" spacing={4}  mt={1}  pb={5} boxShadow={"sm"} alignItems="center">
        <FormControl>
          <FormLabel>Machine ID</FormLabel>
          <Input
            type="text"
            name="machineId"
            value={filterData.machineId}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Employee's Card No</FormLabel>
          <Input
            type="text"
            placeholder='XXAABB'
            name="cardNo"
            value={filterData.cardNo}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={filterData.date}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Transaction</FormLabel>
          <Select
            name="transaction"
            value={filterData.transaction}
            onChange={handleChange}
          >
            <option value="">Transaction Status</option>
            <option value={true}>Success</option>
            <option value={false}>Failed</option>
          </Select>
        </FormControl>
        <Button p={"0px 50px"} colorScheme="teal" type="submit">Filter</Button>
      </HStack>
    </form>
  );
};

export default TransactionFilter;
