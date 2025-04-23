import { createClient, type RedisClientType } from "redis";

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
  private readonly port: number;
  private client: RedisClientType | null = null;
  constructor(options: IRedisClient) {
    const { username, password, host, port } = options;
    this.username = username;
    this.password = password;
    this.host = host;
    this.port = Number(port);
  }

  public async connect(): Promise<RedisClientType> {
    console.log("🔗 Redis connecting...");

    if (this.client) return this.client;

    this.client = createClient({
      username: this.username,
      password: this.password,
      socket: {
        host: this.host,
        port: this.port,
      },
    });

    this.client.on("error", (err) => console.error("Redis error:", err));

    await this.client.connect();
    return this.client;
  }
}
