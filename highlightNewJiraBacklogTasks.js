// Highlights new Jira Backlog tasks since last run. Alerts "No new tasks" if no new tasks are detected. Relies on localStorage.

javascript:(
	async function(){
		async function main() {
			var key = "prevTaskKeys";
			var prevTaskKeys = localStorage.getItem(key);
			
			var curTasks  = $('.ghx-backlog-group .js-issue');
			var curTaskKeys = [];
			curTasks.each(function() {
				curTaskKeys.push($(this).data('issue-key'));
			});
			curTaskKeys = curTaskKeys.sort().toString();

			if (!prevTaskKeys) {
				localStorage.setItem(key, curTaskKeys);
				console.log("First run");
			} else if (curTaskKeys === prevTaskKeys) {
				alert("No new tasks");
			} else {
				localStorage.setItem(key, curTaskKeys);

				curTasks.each(function() {
					if (!prevTaskKeys.includes($(this).data('issue-key'))) {
						$(this).css('background','yellow');
					};
				});

			};
		}
	await main();
	}
)();
