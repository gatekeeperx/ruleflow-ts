export class PropertyNotFoundError extends Error {
  constructor(public readonly property: string) {
    super(`${property} field cannot be found`);
    this.name = 'PropertyNotFoundError';
  }
}
