import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseContract, ContractFactory, ContractRunner } from 'ethers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractDeployerService {

  private contractUrl: string = '/assets/house_swap.json';

  constructor(private httpClient: HttpClient) { }
  //the solidityOutput parameter is the json generated after compiling the solidity contract 
  getContractFromSolidity(solidityOutput: any, signer: ContractRunner): ContractFactory {

    return ContractFactory.fromSolidity(solidityOutput, signer);
  }

  deployContract(contract: ContractFactory): Promise<BaseContract> {
    return contract.deploy();
  }

  getContractAbi(): Observable<any> {
    return this.httpClient.get(this.contractUrl);
  }
}
