
var username = "";
var userId = 0;
var firstName = "";
var lastName = "";
var userType = 0;

// Global Variables for Actions delete and edit
var title = "";
var description = "";
var urltable = "";
var startd = "";
var endd = "";
var address = "";

function goCreated()
{
	localStorage.setItem('UserID', userId);
	window.location.href = "created.html";
}

function goHome()
{
	window.location.href = "participant.html";
}

function goBack()
{
	window.location.href = "superadmin.html";
}

function viewCreated()
{
	localStorage.setItem('UserID', userId);
	window.location.href = "supercreated.html";
}


