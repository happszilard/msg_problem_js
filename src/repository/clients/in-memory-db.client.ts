export class InMemoryDbClient<T> {
  private readonly db = new Map<string, T>();

  public exist(id: string): boolean {
    return this.db.has(id);
  }

  public get(id: string): T | undefined {
    return this.db.get(id);
  }

  public getAll(): T[] {
    return Array.from(this.db.values()) || [];
  }

  public add(id: string, value: T) {
    this.db.set(id, value);
  }

  public remove(id: string): boolean {
    return this.db.delete(id);
  }
}
