import { createClient } from "redis";

interface IRedisClient {
  username: string;
  password: string;
  host: string;
  port: number;
}

export class RedisClient {
  private readonly username: string;
  private readonly password: string;
  private readonly host: string;
  private readonly port: number ;
  public readonly client = createClient;

  constructor(options: IRedisClient) {
    const { username, password, host, port } = options;
    const portNumber = Number(port);
    this.username = username;
    this.password = password;
    this.host = host;
    this.port = portNumber;
  }


  public async connect() {
   const client = await this.client({
      username: this.username,
      password: this.password,
      socket: {
        host: this.host,
        port: this.port,
      },
    }).connect();

    return client;
  }
}
