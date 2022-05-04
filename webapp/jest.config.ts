export default {
	rootDir: './../',
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	collectCoverage: true,
	collectCoverageFrom: ["api.ts"],
	coveragePathIgnorePatterns: ["src/index.tsx"]
}
