// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
	const allDirectors = moviesArray.map((movie) => {
		// UNCOMMENT IF STATEMENT FOR BONUS ITERATION
		// if (!allDirectors.includes(movie.director)) {
		return movie.director;
		// }
	});
	return allDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	const moviesBySpielberg = moviesArray.filter(
		(movie) => movie.director === "Steven Spielberg"
	);
	let dramaCount = 0;
	moviesBySpielberg.forEach((movie) => {
		if (movie.genre.includes("Drama")) {
			dramaCount += 1;
		}
	});
	return dramaCount;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (moviesArray.length === 0) {
		return 0;
	}

	const moviesWithScores = moviesArray.filter((movie) => "score" in movie);
	moviesWithScores.forEach((movie) => {
		if (typeof movie.score === "string") {
			movie.score = 0;
		}
	});
	const avgScore =
		Math.round(
			(moviesWithScores
				.map((movie) => movie.score)
				.reduce((acc, curr) => acc + curr, 0) /
				moviesArray.length) *
				100
		) / 100;
	return avgScore;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	const dramaMovies = moviesArray.filter((movie) =>
		movie.genre.includes("Drama")
	);

	if (dramaMovies.length === 0) {
		return 0;
	}
	const dramaScore = dramaMovies
		.map((movie) => movie.score)
		.reduce((acc, curr) => acc + curr, 0);

	const avgDramaScore =
		Math.round((dramaScore / dramaMovies.length) * 100) / 100;
	return avgDramaScore;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	const sortedArr = moviesArray
		.map((movie) => movie)
		.sort((a, b) => {
			if (a.year > b.year) {
				return 1;
			} else if (a.year < b.year) {
				return -1;
			} else if (a.year === b.year) {
				if (a.title > b.title) {
					return 1;
				} else {
					return -1;
				}
			}
		});
	return sortedArr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	const sortedArr = moviesArray
		.map((movie) => movie.title)
		.sort((a, b) => a.localeCompare(b));

	if (sortedArr.length > 20) {
		sortedArr.splice(20);
	}

	return sortedArr;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	let newArr = JSON.parse(JSON.stringify(moviesArray)).map((movie) => {
		const splitTime = movie.duration.split(" ");

		let durationInMinutes = parseInt(splitTime[0].split("h")) * 60;

		if (splitTime.length > 1) {
			let min = parseInt(splitTime[1].split("min"));
			durationInMinutes += min;
		}
		movie.duration = durationInMinutes;
		return movie;
	});
	return newArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	if (moviesArray.length === 0) {
		return null;
	}

	const yearsAvg = [];

	moviesArray.forEach(function (movie) {
		const year = movie.year;
		let sameYear = moviesArray.filter((movie) => movie.year === year);
		const avgScore =
			Math.round(
				(sameYear.map((movie) => movie.score).reduce((acc, curr) => acc + curr) /
					sameYear.length) *
					100
			) / 100;

		const checkDuplicate = function (arr) {
			return arr.some((movie) => movie.year === year);
		};

		if (!checkDuplicate(yearsAvg)) {
			yearsAvg.push({
				year: year,
				score: avgScore
			});
		}
	});
	const listByAvg = yearsAvg.sort((a, b) => {
		if (a.score > b.score) {
			return 1;
		} else if (a.score < b.score) {
			return -1;
		} else if (a.score === b.score) {
			if (a.year > b.year) {
				return -1;
			} else {
				return 1;
			}
		}
	});

	const result = listByAvg.pop();

	return `The best year was ${result.year} with an average score of ${result.score}`;
}


