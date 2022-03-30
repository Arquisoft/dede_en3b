import { LogInError, SolidConnection } from '../src/SOLID/API';

let solidConnection: SolidConnection;
beforeEach(() => {
	solidConnection = SolidConnection();
});

describe('SolidConnection ', () => {
	describe('Throws an error if ', () => {
		describe('not logged in and ', () => {
			it('trying to convert to logged user URL', () => {
				expect(() => solidConnection.convertToLoggedUserUrl(''))
					.to.throw(LogInError);
			});

			it('trying to get a file from a logged user', () => {
				expect(() => solidConnection.getFileFromLoggedUser(''))
					.to.throw(LogInError);
			});

			it('trying to write a file from a logged user', () => {
				expect(() =>
					solidConnection.overwriteFileInLoggedUserUrl('')
				) .to.throw(LogInError);
			});

			it('trying to fetch a dataset from a logged user', () => {
				expect(() => solidConnection.fetchDatasetFromUser(''))
					.to.throw(LogInError);
			});

			it('trying to get the users webId', () => {
				expect(() => solidConnection.getWebId())
					.to.throw(LogInError);
			});
		});
	});

	describe('is not logged in on initialization ', () => {
		expect(solidConnection.isLoggedIn()).to.equal(false);
	});

	describe('should return ', () => {
		describe('a blob with the text when reading from raw url', () => {
			let url = 'https://mocoma.solidcommunity.net/public/DeDe/test_raw.txt';
			solidConnection
				.getFileFromRawUrl(url)
				.then(blob => expect(blob.text()).to.equal('test'));
		});

		describe('a DatasetBrowser when reading from raw url', () => {
			let url = 'https://mocoma.solidcommunity.net/public/DeDe/test.txt';
			solidConnection
				.fetchDatasetFromRawUrl(url)
				.getThingAsync(url + '#test')
				.then(thing => 
					expect(thing.getString(RDFS.label).to.equal('test'))
				);
		});
	});
});
