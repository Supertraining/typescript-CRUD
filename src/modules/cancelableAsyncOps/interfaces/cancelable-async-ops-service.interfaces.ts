import type { UserEntity } from "../../users/entities/user-entity.entities.js";

export interface ICancelableAsyncOpsService {
  getAll(): Promise<UserEntity[]>;
  executeCancelableAsyncOperations(requestId: string): Promise<unknown>;
}
