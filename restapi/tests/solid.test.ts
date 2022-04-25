import { SolidConnection } from '../SOLID/API';

let connection: SolidConnection;
beforeAll(() => {
	connection = new SolidConnection();
});

describe('solid ', () => {
	describe('before login ', () => {
		it('is not logged in', () => {
			expect(connection.isLoggedIn()).toBe(false);
		});

		describe('throws an error ', () => {
			it('when trying to get webId', () => {
				expect(connection.getWebId).toThrow();
			});

			it('when trying to get convert to logged user url', () => {
				expect(
					(async () => 
						await connection.convertToLoggedUserUrl("")
					)()
				).rejects.toThrow();
			});

			it('when trying to get file from logged user', async () => {
				expect(
					(async () =>
						await connection.getFileFromLoggedUser("")
					)()
				).rejects.toThrow();
			});

			it('when trying to overwrite file of logged user', async () => {
				expect(
					(async() => 
						await connection.overwriteFileInLoggedUserUrl(
							"",
							new File([], "")
						)
					)()
				)
				.rejects.toThrow();
			});

			it('when trying to fetch dataset from user', async () => {
				expect(
					(async () => 
						await connection.fetchDatasetFromUser("")
					)()
				).rejects.toThrow();
			});
		});
	});
});
