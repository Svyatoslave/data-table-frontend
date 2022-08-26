# vars

DOCKER_NAMESPACE=addcodedp/isup
DOCKER_IMAGE=$(DOCKER_NAMESPACE):frontend-etp

# build

build:
	@docker build -t $(DOCKER_IMAGE) .

# run

start:
	@docker run -p 80:80 $(DOCKER_IMAGE)

# push

push:
	@docker push $(DOCKER_IMAGE)
