import { ethers, Interface } from "ethers";

const ethereum = window.ethereum || (window as any).web3?.currentProvider;

/**
 * 读取合约方法
 * @param contractAddress 合约地址
 * @param abi 合约对应的 abi 文件
 * @param funcName 调用的合约方法名
 * @param params 传入的参数
 * @returns promise
 */
export async function getContract(
  contractAddress: string,
  abi: Interface,
  funcName: string,
  ...params: any[]
): Promise<any> {
  try {
    const provider = new ethers.BrowserProvider(ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const response = await contract[funcName](...params);
    return response;
  } catch (err) {
    console.error("Contract call error:", err);
    throw 605; // 合约调用错误
  }
}

/**
 * 写入合约方法
 * @param contractAddress 合约地址
 * @param abi 合约对应的 abi 文件
 * @param funcName 调用的合约方法名
 * @param params 传入的参数
 * @returns promise
 */
export async function getWriteContract(
  contractAddress: string,
  abi: Interface,
  funcName: string,
  ...params: any[]
): Promise<any> {
  try {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const response = await contract[funcName](...params);
    return response;
  } catch (err) {
    console.error("Write contract error:", err);
    throw err;
  }
}

/**
 * 读取合约方法（loading）
 * @param contractAddress 合约地址
 * @param abi 合约对应的 abi 文件
 * @param funcName 调用的合约方法名
 * @param params 传入的参数
 * @returns promise
 */
export async function getContractLoad(
  contractAddress: string,
  abi: Interface,
  funcName: string,
  ...params: any[]
): Promise<any> {
  try {
    const provider = new ethers.BrowserProvider(ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const response = await contract[funcName](...params);

    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          const receipt = await provider.getTransactionReceipt(response.hash);
          if (receipt) {
            clearInterval(timer);
            if (receipt.logs.length) {
              setTimeout(() => resolve(response), 2000);
            } else {
              reject(601); // 链上交互失败
            }
          }
        } catch (err) {
          console.error("Transaction receipt error:", err);
          clearInterval(timer);
          reject(604); // 合约链上交互方法调用错误
        }
      }, 1000);
    });
  } catch (err) {
    console.error("Contract call error:", err);
    throw 605; // 合约调用错误
  }
}

/**
 * 写入合约方法 (loading)
 * @param contractAddress 合约地址
 * @param abi 合约对应的 abi 文件
 * @param funcName 调用的合约方法名
 * @param params 传入的参数
 * @returns promise
 */
export async function getWriteContractLoad(
  contractAddress: string,
  abi: Interface,
  funcName: string,
  ...params: any[]
): Promise<any> {
  try {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const response = await contract[funcName](...params);

    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          const receipt = await provider.getTransactionReceipt(response.hash);
          if (receipt) {
            clearInterval(timer);
            if (receipt.status === 1) {
              setTimeout(() => resolve(response), 2000);
            } else {
              reject(601); // 链上交互失败
            }
          }
        } catch (err) {
          console.error("Transaction receipt error:", err);
          clearInterval(timer);
          reject(604); // 合约链上交互方法调用错误
        }
      }, 1000);
    });
  } catch (err) {
    console.error("Write contract call error:", err);
    throw err;
  }
}
