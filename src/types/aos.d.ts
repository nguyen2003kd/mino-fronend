declare module "aos" {
  type AosOptions = Record<string, unknown>;

  const AOS: {
    init(options?: AosOptions): void;
  };

  export default AOS;
}
