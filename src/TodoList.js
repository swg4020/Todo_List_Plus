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
  Input,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./pages/Header";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });

  // const [mode, setMode] = useState(() => {
  //   const getMode = localStorage.getItem("mode");
  //   return getMode ? JSON.parse(getMode) : [{id: false}];
  // });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cRef = useRef();
  const [currentID, setCurrentID] = useState();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // useEffect(() => {
  //   localStorage.setItem("mode", JSON.stringify(mode));
  // }, [mode]);
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

  const todocount = todos.filter((todo) => todo.finish === true);
  // console.log(todocount[0].finish);
  // const [treset, setTreset] = useState();
  // const ResetTodo = () => {
  //   setTodos([]);
  // };

  // const CloseTodo = () => {
  //   setTreset("-999");
  // };

  // const openTodo = () => {
  //   setTreset("999");
  // };

  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      minH={"100vh"}
      m={"0 auto"}
      bgColor={"gray.900"}
      padding={"100px 20px"}
      position={"relative"}
    >
      {/* <Box
        w={"90%"}
        h={"200px"}
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        flexDirection={"column"}
        position={"absolute"}
        top={"100px"}
        left={"auto"}
        bgColor={"white"}
        zIndex={treset}
        border={"1px solid gray"}
      >
        <Text
          color={"black"}
          bottom={"0"}
          fontSize={"30px"}
          textAlign={"center"}
        >
          정말 삭제하시겠습니까?
        </Text>
        <Box display={"flex"} justifyContent={"end"} marginBottom={"0"} p={"20px"}>
          <Button onClick={ResetTodo} marginRight={"10px"}>
            삭제
          </Button>
          <Button onClick={CloseTodo} marginRight={"10px"}>
            취소
          </Button>
        </Box>
      </Box>
      <Button onClick={openTodo}></Button> */}
      <Header data={todos} count={todocount} />
      <Flex h={"110px"} flexWrap={"wrap"}>
        <Box
          as="form"
          h={"10px"}
          m={"30px 0"}
          onSubmit={handleSubmit(onSubmitTodo)}
          display={"flex"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Input
            {...register("todo", {
              required: "내용을 작성해 주세요.",
            })}
            placeholder="할일을 입력해주세요"
            borderColor={"gray.600"}
            size={"md"}
            width={"85%"}
            color={"white"}
          />

          <Button
            type="submit"
            w={"10%"}
            borderRadius={"50%"}
            bgColor={"cyan.700"}
            color={"white"}
            _hover={"none"}
          >
            +
          </Button>
        </Box>
        <Box color={"white"} margin={"10px"}>
          {errors?.todo?.message}
        </Box>
      </Flex>

      <VStack h={"100%"}>
        {todos.map((data) => (
          <Checkbox
            key={data.id}
            w={"100%"}
            h={"60px"}
            border={"1px solid gray.400"}
            p={"15px"}
            size={"lg"}
            isChecked={data.finish}
            onChange={() => onChangeCheck(data.id)}
            borderRadius={"5px"}
            colorScheme={"green"}
            bgColor={"gray.600"}
            isInvalid={!data.finish}
            spacing={"1rem"}
          >
            <Flex fontWeight={"600"} color={"white"}>
              <Text
                textDecoration={data.finish === true ? "line-through" : "none"}
              >
                {data.text}
              </Text>

              <DeleteIcon
                onClick={() => {
                  onOpen();
                  setCurrentID(data.id);
                }}
                position={"absolute"}
                top={"21px"}
                right={"20px"}
                fontSize={"18px"}
                opacity={"0.65"}
              />
            </Flex>
          </Checkbox>
        ))}
      </VStack>

      <AlertDialog isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent w={"90%"}>
            <AlertDialogHeader>삭제 확인</AlertDialogHeader>
            <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  onClickDelete(currentID);
                  onClose();
                  toast({
                    title: "삭제 완료.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
                marginRight={"10px"}
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
