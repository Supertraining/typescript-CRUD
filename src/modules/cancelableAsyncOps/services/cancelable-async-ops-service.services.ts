import { ActiveRequestManager } from "../../../core/utils/active-request-manager.core.utils.js";
import { createCancelableRequest } from "../../../core/utils/create-cancelable-request.core.utils.js";
import { UserEntity } from "../../users/entities/user-entity.entities.js";
import { UserServiceImpl } from "../../users/services/user-service-impl.services.js";
import type { ICancelableAsyncOpsService } from "../interfaces/cancelable-async-ops-service.interfaces.js";

export class CancelableAsyncOpService implements ICancelableAsyncOpsService {
  constructor(private readonly userService: UserServiceImpl) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  private async *getAsyncOperations(): AsyncGenerator<UserEntity[] | string[]> {
    for (let index = 0; index <= 100; index++) {
      const users: UserEntity[] = await this.getAll();
      yield users;

      const usersOrdered = users.sort(
        (a: UserEntity, b: UserEntity) => Number(b.id) - Number(a.id)
      );
      yield usersOrdered;

      const filteredUsers = usersOrdered.filter((user: UserEntity) => +user.id >= 10);
      yield filteredUsers;

      const mappedUsers = filteredUsers.map((user: UserEntity) => user.fullname);
      yield mappedUsers;
    }
  }

  async executeCancelableAsyncOperations(requestId: string) {
    const activeRequests = ActiveRequestManager.getInstance();
    return createCancelableRequest(requestId, this.getAsyncOperations.bind(this), activeRequests);
  }
}
