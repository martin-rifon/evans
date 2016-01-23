require 'test_helper'

class QueuecontrollerControllerTest < ActionController::TestCase
  test "should get listen" do
    get :listen
    assert_response :success
  end

end
