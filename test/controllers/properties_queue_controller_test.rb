require 'test_helper'

class PropertiesQueueControllerTest < ActionController::TestCase
  test "should get listen" do
    get :listen
    assert_response :success
  end

end
