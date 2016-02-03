Feature: AddUserEndToEnd
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@mytag
Scenario: Add two numbers
	Given I go to the add user page
	When I wait
	Then I am on the right page
