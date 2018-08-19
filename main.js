document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
   var issues = JSON.parse(localStorage.getItem('issues'));
   var issuesList = document.getElementById('issuesList');

   issuesList.innerHTML = '';

   if (issues) {
      for (let i = 0; i < issues.length; i++) {
         const issue = issues[i];
         var id = issue.id
         var desc = issue.description
         var severity = issue.severity
         var projectName = issue.projectName
         var status = issue.status

         issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' +
            status + '</span></p><h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + projectName + '</p>' +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '</div>';
      }
   }
}

function saveIssue(e) {
   debugger;
   var issueId = chance.guid();
   var issueDesc = document.getElementById('issueDescInput').value;
   var issueSeverity = document.getElementById('issueSeverityInput').value;
   var issueProjectName = document.getElementById('issueProjectNameInput').value;
   var issueStatus = 'Open';

   var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      projectName: issueProjectName,
      status: issueStatus
   }

   if (localStorage.getItem('issues') == null) {
      var issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
   } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
   }

   document.getElementById('issueInputForm').reset();

   fetchIssues();

   e.preventDefault()
}

function setStatusClosed(id) {
   var issues = JSON.parse(localStorage.getItem('issues'));

   for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      if (issue.id == id) {
         issue.status = 'Closed';
         break;
      }
   }

   localStorage.setItem('issues', JSON.stringify(issues));
   fetchIssues();
}

function deleteIssue(id) {
   var issues = JSON.parse(localStorage.getItem('issues'));

   for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      if (issue.id == id) {
         issues.splice(i, 1);
      }

      localStorage.setItem('issues', JSON.stringify(issues));

      fetchIssues();
   }
}
