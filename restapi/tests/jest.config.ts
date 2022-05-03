export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["routers/api.ts", "SOLID/API.ts"]
}
