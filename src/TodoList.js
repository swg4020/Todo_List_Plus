import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cRef = useRef();
  const [currentID, setCurrentID] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //자바스크립트파일을 제이슨으로 변경해주면서 변경후에 로컬저장소에 저장된다. 이 기능을 하지 않으면 저장이 되지 않는다.

  const onSubmitTodo = (data) => {
    const { todo } = data;
    setTodos([...todos, { id: Date.now(), text: todo, finish: false }]);
    reset();
  };

  const onChangeCheck = (id) => {
    setTodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };

  const onClickDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  
  console.log(todos);
  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      h={"100vh"}
      m={"0 auto"}
      bgColor={"gray.500"}
      padding={"150px 20px"}
    >
      <Box>
        <Heading>Todo-List-Plus</Heading>
        <Box>{todos.length}</Box>
      </Box>
      <Box as="form" h={"50px"} m={"30px 0"} onSubmit={handleSubmit(onSubmitTodo)} >
        <Input
          {...register("todo", {
            required: "내용을 작성해 주세요.",
          })}
          placeholder="할일을 입력해주세요"
          borderColor={"gray.100"}
          bgColor={"gray.100"}
          size={"md"}
        />
        <Box>{errors?.todo?.message}</Box>
      </Box>

      <VStack>
        {todos.map((data) => (
          <Checkbox
            key={data.id}
            w={"100%"}
            h={"60px"}
            bgColor={"white"}
            p={"15px"}
            size={"lg"}
            isChecked={data.finish}
            onChange={() => onChangeCheck(data.id)}
          >
            <Flex>
              <Box>{data.text}</Box>
              <DeleteIcon
                onClick={() => {
                  onOpen();
                  setCurrentID(data.id);
                }}
              />
            </Flex>
          </Checkbox>
        ))}
      </VStack>

      <AlertDialog isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>삭제 확인</AlertDialogHeader>
            <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  onClickDelete(currentID);
                  onClose();
                }}
              >
                삭제
              </Button>
              <Button ref={cRef} onClick={onClose}>
                취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

export default TodoList;
