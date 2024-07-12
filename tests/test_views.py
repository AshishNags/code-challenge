import pytest
import usaddress


def test_api_parse_succeeds(client):
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    response = client.get('/api/parse?address='+address_string, format='json')
    res = client.get(response.url, format='json')
    assert res.status_code == 200
    assert res.data['address_components']['AddressNumber'] == '123'
    assert res.data['address_components']['StreetName'] == 'main'
    assert res.data['address_components']['StreetNamePostType'] == 'st'
    assert res.data['address_components']['PlaceName'] == 'chicago'
    assert res.data['address_components']['StateName'] == 'il'
    assert res.data['address_type'] == 'Street Address'

def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    try:
        response = client.get('/api/parse?address='+address_string, format='json')
    except usaddress.RepeatedLabelError:
        assert True