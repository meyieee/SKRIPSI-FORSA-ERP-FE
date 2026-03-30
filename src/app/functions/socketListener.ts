import { QueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from 'react';
import socket from "./socket";
import { FormikHelpers } from 'formik';
import { getAuth } from "../modules/auth";

export const getBranchUserSession = (user: any): string => {
  if (!user || typeof user !== 'object') {
    console.error("Invalid user object");
    return ''
  }

  //logic ini salah, karena object user sekarang telah berbentuk raw data
  const branchDetail = user['employees.branch_detail.com_code'] && user['employees.branch_detail.com_type'];
  if (!branchDetail) {
    console.error("Branch detail is missing from user data");
    return ''
  }

  return user['employees.branch_detail.com_type'] === 'HO' ? user['employees.branch_detail.com_type'] : user['employees.branch_detail.com_code'];
};

const generateListenerBranchName = (nameListener: string): { processedSocketListenerName: string } => {
  const result = getAuth();
  if (!result || !result.user) {
    console.error("Invalid user session.");
  }

  const branch = getBranchUserSession(result?.user);
  const processedSocketListenerName = branch === 'HO' ? nameListener : `${nameListener}_${branch}`;
  
  return { processedSocketListenerName };
};

const handleSocketErrorAndDisconnect = () => {
  // Pastikan listener hanya terdaftar sekali
  if (!socket.hasListeners("error")) {
    socket.on("error", (err) => {
      console.error("Socket Error:", err);
    });
  }

  if (!socket.hasListeners("disconnect")) {
    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });
  }
};

export const handleSocketJoinRoom = (branch:string) => {
  // Pastikan listener hanya terdaftar sekali
  if (!socket.hasListeners("join room")) {
    socket.emit('join room', branch)
  }
};


export const SocketListenerGlobalReactQuery = (nameListener:string, queryClient:QueryClient, nameCache:string) => {
  // Set up the socket listener for incoming data
  socket.on(nameListener, (data) => {
    // Perbarui cache menggunakan queryKey berbentuk array
    queryClient.setQueryData([nameCache], data);

    // logic hanya untuk mengupdate sebagian data aja, misalnya untuk update element array kedua dari beberapa array
    // queryClient.setQueryData([nameCache], (oldData: any) => {
    //   return oldData ? { ...oldData, ...data } : data;
    // });

    // Opsional: Invalidasi query jika ingin memaksa refetch API
    // queryClient.invalidateQueries({ queryKey: [nameCache] });
  });

  handleSocketErrorAndDisconnect();
};


export const SocketListenerRoomReactQuery = (nameListener:string, queryClient:QueryClient, nameCache:string) => {
  const { processedSocketListenerName } = generateListenerBranchName(nameListener);
  // console.log("processedSocketListenerName:",processedSocketListenerName)

  // Set up the socket listener for incoming data
  socket.on(processedSocketListenerName,(data) => {
    // console.log("data:",data)
    queryClient.setQueryData([nameCache], data);
  });

  handleSocketErrorAndDisconnect()
}

export const SocketListenerGlobalUseState = <T>(nameListener: string, setState: Dispatch<SetStateAction<T>>) => {

  // Set up the socket listener for incoming data
  socket.on(nameListener,(data) => {
    setState(data)
  });
  handleSocketErrorAndDisconnect()
}

export const SocketListenerRoomUseState = <T>(nameListener: string, setState: Dispatch<SetStateAction<T>>) => {
  const { processedSocketListenerName } = generateListenerBranchName(nameListener);

  // Set up the socket listener for incoming data
  socket.on(processedSocketListenerName,(data) => {
    setState(data)
  });
  
  handleSocketErrorAndDisconnect()
}

export const SocketListenerRoomReactQueryWithUseState =  <T>(nameListener:string, queryClient:QueryClient, nameCache:string, setState: Dispatch<SetStateAction<T>>) => {
  const { processedSocketListenerName } = generateListenerBranchName(nameListener);

  // Set up the socket listener for incoming data
  socket.on(processedSocketListenerName,(data) => {
    queryClient.setQueryData([nameCache], data);
      setState(data)
  });

  handleSocketErrorAndDisconnect()
}

//untuk step 2 sampai step 10 di work order
export const SocketListenerRoomReactQueryFormikPropsAndUseState = <T>(
  nameListener: string, 
  queryClient: QueryClient, 
  nameCache: string, 
  setFunction: Function, 
  nameProps:string, 
  setFieldValue: FormikHelpers<T>['setFieldValue'],
  isActual?: boolean
) => {
  const { processedSocketListenerName } = generateListenerBranchName(nameListener);

  // Set up the socket listener for incoming data
  socket.on(processedSocketListenerName,(data) => {
    queryClient.setQueryData([nameCache], data);
      setFieldValue(nameProps, [])

      if(isActual === undefined){
        setFunction(data)
      }else{
        setFunction(data, isActual)
      }
  });

  handleSocketErrorAndDisconnect()
}