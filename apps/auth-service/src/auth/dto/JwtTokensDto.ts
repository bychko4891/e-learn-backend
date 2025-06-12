export class JwtTokensDto {

    readonly accessToken: string;

    readonly refreshToken: string;

    constructor(accessToken: string, refreshTokens: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshTokens;
        Object.freeze(this);
    }

    toString() {
        return `JwtTokensDto(accessToken=${this.accessToken}, refreshTokens=${this.refreshToken})`;
    }
}