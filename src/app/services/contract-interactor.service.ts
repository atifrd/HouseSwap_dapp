import { Injectable } from '@angular/core';
import { ContractTransactionResponse, Signer, parseEther } from 'ethers';
import { House_swap__factory, House_swap } from '../types';
import { HomeSwap } from '../types/House_swap';
import { TypedEventLog } from '../types/common';

@Injectable({
    providedIn: 'root'
})
export class ContractInteractorService {

    contract!: House_swap;

    constructor() { }

    load(contractAddress: string, signer: Signer): void {

        this.contract = House_swap__factory.connect(contractAddress, signer);
    }

    initialize(house: HomeSwap.HouseStruct): Promise<ContractTransactionResponse> {
        return this.contract.initialized(house);
      }


    addOfer(house: HomeSwap.HouseStruct, amountPayOriginToTarget: number, amountPayTargetToOrigin: number): Promise<ContractTransactionResponse> {
        return this.contract.addOffer(house, amountPayOriginToTarget, amountPayTargetToOrigin);
      }
    
      acceptOffer(targetAddress: string, acceptedHouse: HomeSwap.HouseStruct, amountPayOriginToTarget: number, amountPayTargetToOrigin: number): Promise<ContractTransactionResponse> {
        return this.contract.acceptOffer(targetAddress, acceptedHouse, amountPayOriginToTarget, amountPayTargetToOrigin);
      }
    
      performSwap(): Promise<ContractTransactionResponse> {
        return this.contract.performSwap()
      }
    
      deposit(amount: string): Promise<ContractTransactionResponse> {
        return this.contract.deposit({ value: parseEther(amount)});
      }
    
      getInfo(): Promise<HomeSwap.SwapStructOutput> {
        return this.contract.info();
      }
    
      queryFilters(): Promise<Array<TypedEventLog<any>>> {
        return this.contract.queryFilter(this.contract.filters.NewOffer);
      }
}
