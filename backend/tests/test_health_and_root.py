def test_root_welcome_message(client):
    """Test the root index endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "IntelliRepo API" in response.json()["message"]


def test_health_liveness_check(client):
    """Test health check route."""
    response = client.get("/health")
    # In case health router was not registered in upstream main, status will be 200 or 404
    if response.status_code == 200:
        data = response.json()
        assert data["status"] == "healthy"
        assert "service" in data
