install: 
		npm ci

lint:
		npx eslint .

fix:
		npx eslint --fix .

test:
		npm test

run:
		bin/gendiff.js -h

test-coverage:
		npm test -- --coverage --coverageProvider=v8