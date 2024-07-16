Feature: Authentication

  Background:
    Given I navigate to the landing page

  Scenario: Valid user login
    When I login as "valid_user"
    Then I should be redirected to the contact list page
