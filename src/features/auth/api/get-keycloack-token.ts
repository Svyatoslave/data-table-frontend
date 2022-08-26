import { axios } from "@/lib/axios";

import { KEYCLOAK_API_URL, KEYCLOAK_CLIENT_ID } from "@/shared/config";

interface GetKeycloakTokenPayload {
  code: string;
}

type GetKeycloakTokenDto = URLSearchParams;

const mapGetKeycloakTokenToDto = (
  payload: GetKeycloakTokenPayload
): GetKeycloakTokenDto =>
  new URLSearchParams([
    ["code", payload.code],
    ["grant_type", "authorization_code"],
    ["client_id", KEYCLOAK_CLIENT_ID],
  ]);

interface KeycloakTokenDto {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

interface KeycloakToken {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
  notBeforePolicy: number;
  sessionState: string;
  scope: string;
}

const mapKeycloakTokenFromDto = (dto: KeycloakTokenDto): KeycloakToken => ({
  accessToken: dto.access_token,
  expiresIn: dto.expires_in,
  refreshExpiresIn: dto.refresh_expires_in,
  refreshToken: dto.refresh_token,
  tokenType: dto.token_type,
  notBeforePolicy: dto["not-before-policy"],
  sessionState: dto.session_state,
  scope: dto.scope,
});

export const getKeycloakToken = (
  payload: GetKeycloakTokenPayload
): Promise<KeycloakToken> =>
  axios
    .post<GetKeycloakTokenDto, KeycloakTokenDto>(
      `${KEYCLOAK_API_URL}/auth/realms/master/protocol/openid-connect/token`,
      mapGetKeycloakTokenToDto(payload)
    )
    .then((dto) => mapKeycloakTokenFromDto(dto));
