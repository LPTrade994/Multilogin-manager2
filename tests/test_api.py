import importlib

def test_imports() -> None:
    assert importlib.import_module('app.main')
