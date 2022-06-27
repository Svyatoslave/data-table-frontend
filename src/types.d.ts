import "vue-router";

type PublicityType = "public" | "private" | "shared";

declare module "vue-router" {
  interface RouteMeta {
    typeOfPublicity: PublicityType;
  }
}
